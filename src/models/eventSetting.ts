export interface EventSettingData {
  id: number; // Unique identifier for the event setting
  logo: string; // URL for the logo image
  backgroundImage: string; // URL for the background image
  backgroundColor: string; // Hexadecimal color code for the background
  buttonColor: string; // CSS value for button color (can be a solid color or gradient)
  numberBackgroundColor: string; // CSS value for number background color (can be a solid color or gradient)
  textColor: string; // Hexadecimal color code for text
  showBackground: boolean; // Whether to show the background
  showPrizeImages: boolean | null; // Whether to show prize images (nullable)
  showLogo: boolean; // Whether to show the logo
  showEventName: boolean; // Whether to show the event name
  numberOfSlots: number; // Number of slots in the event
  spinCategory: string; // Category of the spin (e.g., includes numbers and letters)
  spinType: string; // Type of spin (e.g., spin by individual letters)
  eventId: number; // Unique identifier for the event
  eventName: string; // Name of the event
}
