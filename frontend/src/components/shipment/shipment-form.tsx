"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { createShipment, matchShipment } from "@/services/shipment";
import type { Shipment } from "@/types";

const shipmentSchema = z.object({
  origin: z.string().min(2, "Pickup location is required"),
  destination: z.string().min(2, "Destination is required"),
  cargo_type: z.string().min(2, "Cargo type is required"),
  cargo_weight_tons: z.coerce.number().positive("Weight must be greater than 0"),
  pickup_datetime: z.string().optional()
});

type ShipmentFormValues = z.infer<typeof shipmentSchema>;

export function ShipmentForm({ onCreated }: { onCreated?: (shipment: Shipment) => void }) {
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: { origin: "", destination: "", cargo_type: "", cargo_weight_tons: 0, pickup_datetime: "" }
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    if (!user) {
      setSubmitError("Please sign in to create shipments.");
      return;
    }

    try {
      const created = await createShipment({
        ...values,
        user_id: user.id,
        status: "pending"
      });
      onCreated?.(created);

      await matchShipment(created.id);
      setSubmitSuccess("Shipment created and matching requested.");
      reset();
    } catch (error) {
      setSubmitError("Could not create shipment. Check your session and try again.");
    }
  });

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">Create shipment</h3>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <Input placeholder="Pickup location" {...register("origin")} />
          {errors.origin ? <p className="mt-2 text-xs text-pace-amber">{errors.origin.message}</p> : null}
        </div>
        <div>
          <Input placeholder="Destination" {...register("destination")} />
          {errors.destination ? <p className="mt-2 text-xs text-pace-amber">{errors.destination.message}</p> : null}
        </div>
        <div>
          <Input placeholder="Cargo type" {...register("cargo_type")} />
          {errors.cargo_type ? <p className="mt-2 text-xs text-pace-amber">{errors.cargo_type.message}</p> : null}
        </div>
        <div>
          <Input placeholder="Cargo weight (tons)" type="number" step="0.1" {...register("cargo_weight_tons")} />
          {errors.cargo_weight_tons ? <p className="mt-2 text-xs text-pace-amber">{errors.cargo_weight_tons.message}</p> : null}
        </div>
        <div className="md:col-span-2">
          <Input placeholder="Pickup date and time" type="datetime-local" {...register("pickup_datetime")} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Request match</Button>
        </div>
        {submitError ? <p className="md:col-span-2 text-sm text-pace-amber">{submitError}</p> : null}
        {submitSuccess ? <p className="md:col-span-2 text-sm text-pace-teal">{submitSuccess}</p> : null}
      </form>
    </Card>
  );
}
