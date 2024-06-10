# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:147276@localhost/fast"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

origins = [
    "http://localhost:*",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Player(Base):
    __tablename__ = "players"
    name = Column(String, primary_key=True, index=True)
    score = Column(Integer, default=0)


Base.metadata.create_all(bind=engine)


class PlayerCreate(BaseModel):
    name: str


class PlayerUpdate(BaseModel):
    name: str
    score: int


@app.post("/players/")
def create_player(player: PlayerCreate):
    db = SessionLocal()
    db_player = db.query(Player).filter(Player.name == player.name).first()
    if db_player:
        return db_player
    new_player = Player(name=player.name)
    db.add(new_player)
    db.commit()
    db.refresh(new_player)
    return new_player


@app.get("/players/")
def get_players():
    db = SessionLocal()
    players = db.query(Player).all()
    return players


@app.get("/players/top10/")
def get_top_players():
    db = SessionLocal()
    players = db.query(Player).order_by(Player.score.desc()).limit(10).all()
    return players


@app.put("/players/")
def update_player(player: PlayerUpdate):
    db = SessionLocal()
    db_player = db.query(Player).filter(Player.name == player.name).first()
    if not db_player:
        raise HTTPException(status_code=404, detail="Player not found")
    db_player.score = player.score
    db.commit()
    db.refresh(db_player)
    return db_player
