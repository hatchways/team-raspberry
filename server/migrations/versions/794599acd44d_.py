"""empty message

Revision ID: 794599acd44d
Revises: c5cb8a97feed
Create Date: 2020-07-24 10:54:24.965500

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '794599acd44d'
down_revision = 'c5cb8a97feed'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('created', sa.DateTime(), nullable=False))
    op.add_column('users', sa.Column('first_name', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=50), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    op.drop_column('users', 'created')
    # ### end Alembic commands ###
