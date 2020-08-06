"""prospect_campaign_joins_table

Revision ID: b00df384266b
Revises: ae57d21b59ce
Create Date: 2020-08-05 22:23:30.894969

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b00df384266b'
down_revision = 'ae57d21b59ce'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('prospect_campaign_joins',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('campaign_id', sa.BigInteger(), nullable=False),
    sa.Column('prospect_id', sa.BigInteger(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], ),
    sa.ForeignKeyConstraint(['prospect_id'], ['prospects.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )


def downgrade():
    op.drop_table('prospect_campaign_joins')
    
