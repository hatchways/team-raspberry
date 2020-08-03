"""campaign_steps table

Revision ID: 7be0d53b2d0e
Revises: e5cb66928057
Create Date: 2020-08-03 16:29:44.747100

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7be0d53b2d0e'
down_revision = 'e5cb66928057'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('campaign_steps',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('step_name', sa.String(length=200), nullable=False),
    sa.Column('email_subject', sa.String(length=200), nullable=False),
    sa.Column('email_body', sa.String(length=10000), nullable=False),
    sa.Column('campaign_id', sa.BigInteger(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False)
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )


def downgrade():
        op.drop_table('campaign_steps')

