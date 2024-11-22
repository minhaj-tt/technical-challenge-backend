import { Request, Response } from "express";

const locations = [
  {
    id: 1,
    name: "Central Park",
    latitude: 40.785091,
    longitude: -73.968285,
  },
  {
    id: 2,
    name: "Times Square",
    latitude: 40.758896,
    longitude: -73.98513,
  },
  {
    id: 3,
    name: "Empire State Building",
    latitude: 40.748817,
    longitude: -73.985428,
  },
];

export async function getLocations(req: Request, res: Response): Promise<void> {
  try {
    res.status(200).json({
      message: "Locations retrieved successfully",
      locations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Server error" });
  }
}
