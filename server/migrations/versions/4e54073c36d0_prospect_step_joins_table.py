"""prospect_step_joins table

Revision ID: 4e54073c36d0
Revises: 7be0d53b2d0e
Create Date: 2020-08-03 16:30:01.050144

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e54073c36d0'
down_revision = '7be0d53b2d0e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('prospect_step_joins',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('step_id', sa.BigInteger(), nullable=False),
    sa.Column('prospect_id', sa.BigInteger(), nullable=False),
    sa.Column('email_sent', sa.Boolean, nullable=False),
    sa.Column('email_opened', sa.Boolean, nullable=False),
    sa.Column('email_replied', sa.Boolean, nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['step_id'], ['campaign_steps.id'], ),
    sa.ForeignKeyConstraint(['prospect_id'], ['prospects.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )


def downgrade():
    op.drop_table('prospect_step_joins')
    # pass

