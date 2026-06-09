import json
import random
from pathlib import Path
from datetime import datetime, timedelta

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)

INDIAN_CITIES = [
    ("Chennai", 13.0827, 80.2707),
    ("Bengaluru", 12.9716, 77.5946),
    ("Hyderabad", 17.3850, 78.4867),
    ("Delhi", 28.7041, 77.1025),
    ("Mumbai", 19.0760, 72.8777),
    ("Pune", 18.5204, 73.8567),
    ("Ahmedabad", 23.0225, 72.5714),
    ("Jaipur", 26.9124, 75.7873),
    ("Lucknow", 26.8467, 80.9462),
    ("Kolkata", 22.5726, 88.3639),
    ("Kochi", 9.9312, 76.2673),
    ("Coimbatore", 11.0168, 76.9558),
    ("Nagpur", 21.1458, 79.0882),
    ("Visakhapatnam", 17.6868, 83.2185),
    ("Surat", 21.1702, 72.8311),
]

def write_json(name, data):
    path = DATA_DIR / name
    path.write_text(json.dumps(data, indent=2, default=str), encoding="utf-8")
    print(f"Wrote {len(data)} records to {path}")

def gen_companies(n=20):
    industries = ["Freight", "Retail Logistics", "Cold Chain", "Construction", "Oil & Gas"]
    companies = []
    for i in range(1, n+1):
        city, lat, lon = random.choice(INDIAN_CITIES)
        companies.append({
            "name": f"PACE Logistics {i}",
            "industry": random.choice(industries),
            "city": city,
            "contact_email": f"ops{i}@pacelogistics{i}.com",
        })
    return companies

def gen_users(n=100, companies=20):
    roles = ["user", "logistics_company", "admin"]
    users = []
    for i in range(1, n+1):
        users.append({
            "email": f"user{i}@pace.local",
            "password": "password123",
            "full_name": f"User {i}",
            "role": random.choice(roles),
        })
    return users

def gen_trucks(n=100, companies=20):
    types = ["Reefer", "Box", "Flatbed", "Tanker", "Curtainsider"]
    cargo_types = ["general", "food", "pharma", "electronics", "machinery", "textiles"]
    trucks = []
    for i in range(1, n+1):
        city, lat, lon = random.choice(INDIAN_CITIES)
        trucks.append({
            "company_id": random.randint(1, companies),
            "truck_number": f"PACE-TRK-{1000 + i}",
            "capacity_tons": round(random.uniform(5, 40), 1),
            "truck_type": random.choice(types),
            "current_city": city,
            "availability_status": random.choice(["available", "in_transit", "maintenance"]),
            "rating": round(random.uniform(3.5, 5.0), 2),
            "cargo_type_compatibility": ", ".join(random.sample(cargo_types, k=random.randint(1,3))),
            "is_active": True,
        })
    return trucks

def gen_drivers(n=50, companies=20, trucks=100):
    drivers = []
    for i in range(1, n+1):
        drivers.append({
            "company_id": random.randint(1, companies),
            "full_name": f"Driver {i}",
            "phone": f"+91{random.randint(6000000000,9999999999)}",
            "license_number": f"DL-{random.randint(1000000,9999999)}-{i}",
            "assigned_truck_id": random.choice([None] + list(range(1, trucks+1))),
            "is_available": random.choice([True, False]),
        })
    return drivers

def gen_shipments(n=1000, users=100, companies=20):
    cargo_types = ["general", "food", "pharma", "electronics", "machinery", "textiles"]
    statuses = ["pending", "in_transit", "delivered", "cancelled"]
    shipments = []
    now = datetime.utcnow()
    for i in range(1, n+1):
        origin = random.choice(INDIAN_CITIES)[0]
        dest = random.choice(INDIAN_CITIES)[0]
        while dest == origin:
            dest = random.choice(INDIAN_CITIES)[0]
        pickup = now + timedelta(days=random.randint(0, 14), hours=random.randint(0,23))
        shipments.append({
            "user_id": random.randint(1, users),
            "company_id": random.randint(1, companies),
            "origin": origin,
            "destination": dest,
            "cargo_type": random.choice(cargo_types),
            "cargo_weight_tons": round(random.uniform(0.5, 30.0), 2),
            "pickup_datetime": pickup.isoformat(),
            "status": random.choices(statuses, weights=[0.5,0.3,0.15,0.05])[0],
        })
    return shipments

def gen_gps(n=5000, trucks=100):
    gps = []
    now = datetime.utcnow()
    for i in range(1, n+1):
        truck_id = random.randint(1, trucks)
        city, lat, lon = random.choice(INDIAN_CITIES)
        lat_noisy = lat + random.uniform(-0.05, 0.05)
        lon_noisy = lon + random.uniform(-0.05, 0.05)
        recorded = now - timedelta(minutes=random.randint(0, 60*24*7))
        gps.append({
            "truck_id": truck_id,
            "latitude": round(lat_noisy, 6),
            "longitude": round(lon_noisy, 6),
            "recorded_at": recorded.isoformat(),
        })
    return gps

def main():
    companies = gen_companies(20)
    write_json("companies.json", companies)

    users = gen_users(100, companies=20)
    write_json("users.json", users)

    trucks = gen_trucks(100, companies=20)
    write_json("trucks.json", trucks)

    drivers = gen_drivers(50, companies=20, trucks=100)
    write_json("drivers.json", drivers)

    shipments = gen_shipments(1000, users=100, companies=20)
    write_json("shipments.json", shipments)

    gps = gen_gps(5000, trucks=100)
    write_json("gps_logs.json", gps)

    # leave payments.json for later or empty
    write_json("payments.json", [])

if __name__ == "__main__":
    main()
