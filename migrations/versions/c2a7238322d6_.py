"""empty message

Revision ID: c2a7238322d6
Revises: 5301fad3a861
Create Date: 2024-08-07 02:01:18.300643

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c2a7238322d6'
down_revision = '5301fad3a861'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('creations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('content', sa.Text(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('creations', schema=None) as batch_op:
        batch_op.drop_column('content')
        batch_op.drop_column('title')

    # ### end Alembic commands ###
