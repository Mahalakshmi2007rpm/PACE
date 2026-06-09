"""initial schema

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-06-08 00:00:00.000000
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "0001_initial_schema"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "companies",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False, unique=True),
        sa.Column("industry", sa.String(length=255)),
        sa.Column("city", sa.String(length=255)),
        sa.Column("contact_email", sa.String(length=255)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_companies_id"), "companies", ["id"], unique=False)
    op.create_index(op.f("ix_companies_name"), "companies", ["name"], unique=True)

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False, unique=True),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=255)),
        sa.Column("role", sa.String(length=50), nullable=False),
        sa.Column("company_id", sa.Integer(), sa.ForeignKey("companies.id")),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    op.create_table(
        "trucks",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("company_id", sa.Integer(), sa.ForeignKey("companies.id")),
        sa.Column("truck_number", sa.String(length=100), nullable=False, unique=True),
        sa.Column("capacity_tons", sa.Float(), nullable=False),
        sa.Column("truck_type", sa.String(length=100), nullable=False),
        sa.Column("current_city", sa.String(length=255)),
        sa.Column("availability_status", sa.String(length=50), nullable=False, server_default="available"),
        sa.Column("rating", sa.Float(), nullable=False, server_default="5.0"),
        sa.Column("cargo_type_compatibility", sa.String(length=255)),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_trucks_id"), "trucks", ["id"], unique=False)
    op.create_index(op.f("ix_trucks_truck_number"), "trucks", ["truck_number"], unique=True)

    op.create_table(
        "drivers",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("company_id", sa.Integer(), sa.ForeignKey("companies.id")),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=50)),
        sa.Column("license_number", sa.String(length=100), nullable=False, unique=True),
        sa.Column("assigned_truck_id", sa.Integer(), sa.ForeignKey("trucks.id")),
        sa.Column("is_available", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_drivers_id"), "drivers", ["id"], unique=False)
    op.create_index(op.f("ix_drivers_license_number"), "drivers", ["license_number"], unique=True)

    op.create_table(
        "shipments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("company_id", sa.Integer(), sa.ForeignKey("companies.id")),
        sa.Column("origin", sa.String(length=255), nullable=False),
        sa.Column("destination", sa.String(length=255), nullable=False),
        sa.Column("cargo_type", sa.String(length=100), nullable=False),
        sa.Column("cargo_weight_tons", sa.Float(), nullable=False),
        sa.Column("pickup_datetime", sa.DateTime(timezone=True)),
        sa.Column("status", sa.String(length=50), nullable=False, server_default="pending"),
        sa.Column("match_score", sa.Float()),
        sa.Column("estimated_empty_miles_saved", sa.Float()),
        sa.Column("estimated_profit", sa.Float()),
        sa.Column("recommended_truck_id", sa.Integer(), sa.ForeignKey("trucks.id")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_shipments_id"), "shipments", ["id"], unique=False)

    op.create_table(
        "gps_logs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("truck_id", sa.Integer(), sa.ForeignKey("trucks.id"), nullable=False),
        sa.Column("latitude", sa.Float(), nullable=False),
        sa.Column("longitude", sa.Float(), nullable=False),
        sa.Column("speed_kph", sa.Float()),
        sa.Column("recorded_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_gps_logs_id"), "gps_logs", ["id"], unique=False)

    op.create_table(
        "payments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("shipment_id", sa.Integer(), sa.ForeignKey("shipments.id"), nullable=False),
        sa.Column("company_id", sa.Integer(), sa.ForeignKey("companies.id")),
        sa.Column("amount", sa.Float(), nullable=False),
        sa.Column("currency", sa.String(length=10), nullable=False, server_default="USD"),
        sa.Column("status", sa.String(length=50), nullable=False, server_default="pending"),
        sa.Column("description", sa.String(length=255)),
        sa.Column("paid_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index(op.f("ix_payments_id"), "payments", ["id"], unique=False)


def downgrade() -> None:
    op.drop_table("payments")
    op.drop_table("gps_logs")
    op.drop_table("shipments")
    op.drop_table("drivers")
    op.drop_table("trucks")
    op.drop_table("users")
    op.drop_table("companies")
