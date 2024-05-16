import axios, { AxiosResponse } from "axios";

// Interface for BaseEvent
export interface BaseEvent {
  _id: string;
  description: string;
  price: number;
  start: Date;
  end: Date;
}

// Base URL of your API
const baseURL = "http://localhost:5000/api/event";

// Function to create a new event
export const sendCreateEventRequest = async (
  event: BaseEvent
): Promise<AxiosResponse<BaseEvent>> => {
  try {
    const response = await axios.post<BaseEvent>(`${baseURL}`, event);
    return response;
  } catch (error) {
    throw new Error(`Failed to create event: ${error}`);
  }
};

// Function to retrieve all events
export const sendGetAllEventsRequest = async (): Promise<
  AxiosResponse<BaseEvent[]>
> => {
  try {
    const response = await axios.get<BaseEvent[]>(`${baseURL}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to retrieve events: ${error}`);
  }
};

// Function to retrieve a single event by ID
export const sendGetEventByIdRequest = async (
  eventId: string
): Promise<AxiosResponse<BaseEvent>> => {
  try {
    const response = await axios.get<BaseEvent>(`${baseURL}/${eventId}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to retrieve event: ${error}`);
  }
};

// Function to update an event by ID
export const sendUpdateEventRequest = async (
  eventId: string,
  event: any
): Promise<AxiosResponse<BaseEvent>> => {
  try {
    const response = await axios.put<BaseEvent>(`${baseURL}/${eventId}`, event);
    return response;
  } catch (error) {
    throw new Error(`Failed to update event: ${error}`);
  }
};

// Function to delete an event by ID
export const sendDeleteEventRequest = async (
  eventId: string
): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/${eventId}`);
  } catch (error) {
    throw new Error(`Failed to delete event: ${error}`);
  }
};
