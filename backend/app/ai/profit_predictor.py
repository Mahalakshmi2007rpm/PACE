def estimate_profit(match_score: float, shipment_value: float) -> float:
    return round((match_score / 100.0) * shipment_value * 0.18, 2)
