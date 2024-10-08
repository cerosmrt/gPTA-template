"""empty message

Revision ID: 54ce2ff38f60
Revises: 37a826df9583
Create Date: 2024-08-08 04:45:56.468465

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54ce2ff38f60'
down_revision = '37a826df9583'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scrolls', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scrolls', schema=None) as batch_op:
        batch_op.drop_column('title')

    # ### end Alembic commands ###
