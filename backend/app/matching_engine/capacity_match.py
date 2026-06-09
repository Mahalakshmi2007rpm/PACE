def capacity_score(capacity_tons: float, shipment_weight_tons: float) -> float:
    if capacity_tons <= 0:
        return 0.0
    if capacity_tons < shipment_weight_tons:
        return max(0.0, 1.0 - (shipment_weight_tons - capacity_tons) / shipment_weight_tons)
    ratio = shipment_weight_tons / capacity_tons
    return min(1.0, 0.7 + (ratio * 0.3))
