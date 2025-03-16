export interface EventSettingData {
  id: number;
  logo: string;
  backgroundImage: string;
  backgroundColor: string;
  buttonColor: string;
  numberBackgroundColor: string;
  textColor: string;
  showBackground: boolean;
  showPrizeImages: boolean | null;
  showLogo: boolean;
  showEventName: boolean;
  numberOfSlots: number;
  spinCategory: string;
  spinType: string;
  eventId: number;
  eventName: string;
}

export interface UpdateEventSettingData {
  logo: string; // URL for the logo image
  backgroundImage: string; // URL for the background image
  backgroundColor: string; // Hexadecimal color code for the background
  buttonColor: string; // CSS value for button color (can be a solid color or gradient)
  numberBackgroundColor: string; // CSS value for number background color (can be a solid color or gradient)
  textColor: string; // Hexadecimal color code for text
  showBackground: boolean; // Whether to show the background
  // showPrizeImages: boolean | null; // Whether to show prize images (nullable)
  showLogo: boolean; // Whether to show the logo
  showEventName: boolean; // Whether to show the event name
  // numberOfSlots: number; // Number of slots in the event
  // spinCategory: string; // Category of the spin (e.g., includes numbers and letters)
  // spinType: string; // Type of spin (e.g., spin by individual letters)
}

export interface UpdateEventDisplayData {
  logo: string; // URL for the logo image
  backgroundImage: string; // URL for the background image
  backgroundColor: string; // Hexadecimal color code for the background
  buttonColor: string; // CSS value for button color (can be a solid color or gradient)
  numberBackgroundColor: string; // CSS value for number background color (can be a solid color or gradient)
  textColor: string;
}
