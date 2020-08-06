"""add column to campaigns

Revision ID: ae57d21b59ce
Revises: 4e54073c36d0
Create Date: 2020-08-05 16:37:37.454658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ae57d21b59ce'
down_revision = '4e54073c36d0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('campaigns', sa.Column('reply_count', sa.BigInteger(), nullable=False))
    op.add_column('campaigns', sa.Column('prospect_count', sa.BigInteger(), nullable=False))
    


def downgrade():
    op.drop_column('campaigns', 'reply_count')
    op.drop_column('campaigns', 'prospect_count')

