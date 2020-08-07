"""empty message

Revision ID: ef0105c0ae61
Revises: b00df384266b
Create Date: 2020-08-06 17:53:46.887966

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef0105c0ae61'
down_revision = 'b00df384266b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('prospects', 'status')
    op.drop_column('users', 'credentials')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('credentials', sa.VARCHAR(length=500), autoincrement=False, nullable=True))
    op.add_column('prospects', sa.Column('status', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
    # ### end Alembic commands ###