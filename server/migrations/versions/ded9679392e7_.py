"""empty message

Revision ID: ded9679392e7
Revises: 3da20d77a8ab
Create Date: 2020-08-04 13:58:04.562488

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ded9679392e7'
down_revision = '3da20d77a8ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('credentials', sa.String(length=1000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'credentials')
    # ### end Alembic commands ###
