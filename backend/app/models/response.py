from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
from datetime import datetime, timezone


class Response(Base):
    __tablename__ = 'responses'

    id = Column(Integer, primary_key=True, index=True)
    survey_id = Column(Integer, ForeignKey('surveys.id'), nullable=False)
    submitted_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    survey = relationship('Survey', back_populates='responses')
    answers = relationship('Answer', back_populates='response', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'survey_id': self.survey_id,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Answer(Base):
    __tablename__ = 'answers'

    id = Column(Integer, primary_key=True, index=True)
    response_id = Column(Integer, ForeignKey('responses.id'), nullable=False)
    question_id = Column(Integer, ForeignKey('questions.id'), nullable=False)
    answer_value = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    response = relationship('Response', back_populates='answers')
    question = relationship('Question', back_populates='answers')

    def to_dict(self):
        return {
            'id': self.id,
            'response_id': self.response_id,
            'question_id': self.question_id,
            'answer_value': self.answer_value,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
