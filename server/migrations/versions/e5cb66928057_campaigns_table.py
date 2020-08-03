"""campaigns table

Revision ID: e5cb66928057
Revises: 416adbd95dac
Create Date: 2020-08-03 16:29:26.866878

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e5cb66928057'
down_revision = '416adbd95dac'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('campaigns',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=False)
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )


def downgrade():
    op.drop_table('campaigns')
