import { Request, Response } from "express";
import Lead from "../models/leadModel";

export const createLead = async (req: Request, res: Response) => {
  const { email, name, number, product } = req.body;
  try {
    const lead = new Lead({ email, name, number, product });
    await lead.save();
    return res.status(201).json({
      status: 201,
      message: "Lead registered successfully",
      data: lead,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find();

    return res.status(201).json({
      status: 201,
      message: "Lead fetched successfully",
      data: leads,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findById(id);
    if (!lead)
      return res.status(404).json({
        status: 404,
        message: "Lead not found",
      });

    return res.status(201).json({
      status: 201,
      message: "Single lead get successfully",
      data: lead,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, number, product } = req.body;

  try {
    const lead = await Lead.findByIdAndUpdate(
      id,
      { email, name, number, product },
      { new: true }
    );
    if (!lead)
      return res.status(404).json({
        status: 404,
        message: "Lead not found",
      });

    return res.status(201).json({
      status: 201,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead)
      return res.status(404).json({
        status: 404,
        message: "Lead not found",
      });

    return res.status(201).json({
      status: 201,
      message: "Lead deleted successfully",
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};
