"""empty message

Revision ID: 45c64dc96de5
Revises: 563f32e7d5e9
Create Date: 2020-07-28 20:29:51.513763

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45c64dc96de5'
down_revision = '563f32e7d5e9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('prospects',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('status', sa.String(length=120), nullable=True),
    sa.Column('firstName', sa.String(length=120), nullable=True),
    sa.Column('lastName', sa.String(length=120), nullable=True),
    sa.Column('userId', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('prospects')
    # ### end Alembic commands ###
