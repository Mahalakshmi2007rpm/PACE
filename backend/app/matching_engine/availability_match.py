def availability_score(availability_status: str, cargo_type_compatibility: str | None, shipment_cargo_type: str) -> float:
    score = 1.0 if availability_status.lower() == "available" else 0.25
    if cargo_type_compatibility:
        compatible_types = {item.strip().lower() for item in cargo_type_compatibility.split(",") if item.strip()}
        if compatible_types and shipment_cargo_type.lower() not in compatible_types:
            score *= 0.4
    return score
