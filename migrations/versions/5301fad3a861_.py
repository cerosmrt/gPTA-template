"""empty message

Revision ID: 5301fad3a861
Revises: 7e2a2b20faab
Create Date: 2024-07-29 23:12:19.186842

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5301fad3a861'
down_revision = '7e2a2b20faab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('text_voided',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('text_voided')
    # ### end Alembic commands ###
