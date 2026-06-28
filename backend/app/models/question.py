from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime, timezone


class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True, index=True)
    survey_id = Column(Integer, ForeignKey('surveys.id'), nullable=False)
    text = Column(String(500), nullable=False)
    question_type = Column(String(50), nullable=False)
    position = Column(Integer, default=0, nullable=False)
    required = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    survey = relationship('Survey', back_populates='questions')
    answers = relationship('Answer', back_populates='question', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'survey_id': self.survey_id,
            'text': self.text,
            'question_type': self.question_type,
            'position': self.position,
            'required': bool(self.required),
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
