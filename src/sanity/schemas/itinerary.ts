import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const itinerary = {
  name: "clientItinerarys",
  title: "Client Itinerarys",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "clientAccepted",
      title: "Client Accepted",
      type: "boolean",
      initialValue: false,
      description: "If the client has accepted the itinerary, then check this box",
    },
    {
      name: "clientNumber",
      title: "Client Number",
      type: "string",
    },
    {
      name: "tripTo",
      title: "Trip To",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "deal",
      title: "Deal",
      type: "string",
      description: "If the itinerary is a deal, then enter the deal name here",
    },
    {
      name: "adults",
      title: "Adults",
      type: "number",
    },
    {
      name: "children",
      title: "Children",
      type: "number",
    },
    {
      name: "infant",
      title: "Infant",
      type: "number",
    },
    {
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "days",
      title: "Days",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "nights",
      title: "Nights",
      type: "number",
    },
    {
      name: "itineraryTitle",
      title: "Itinerary Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "isHotels",
      title: "Is Hotels",
      type: "boolean",
    },
    {
      name: "isFlight",
      title: "Is Flight",
      type: "boolean",
    },
    {
      name: "isTransfer",
      title: "Is Transfer",
      type: "boolean",
    },
    {
      name: "isSightseeing",
      title: "Is Sightseeing",
      type: "boolean",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "priceActual",
      title: "Price Actual",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "coverImages",
      title: "Cover Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          sources: [unsplashAssetSource],
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "placeImages",
      title: "Place Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          sources: [unsplashAssetSource],
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "inclusion",
      title: "Inclusion",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "day",
              title: "Day",
              type: "number",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "date",
              title: "Date",
              type: "datetime",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "activaties",
              title: "Activaties",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: "duration",
                      title: "Duration",
                      type: "string",
                    },
                    {
                      name: "ticketIncluded",
                      title: "Ticket Included?",
                      type: "boolean",
                      initialValue: false,
                      description:
                        "If the ticket is included in the price, then check this box",
                    },
                    {
                      name: "images",
                      title: "Images",
                      type: "array",
                      of: [
                        {
                          type: "image",
                          options: { hotspot: true },
                          sources: [unsplashAssetSource],
                        },
                      ],
                      options: {
                        layout: "grid",
                      },
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "array",
                      of: [{ type: "block" }],
                    },
                    {
                      name: "experiences",
                      title: "Experiences",
                      type: "object",
                      fields: [
                        {
                          name: "title",
                          title: "Title",
                          type: "string",
                        },
                        {
                          name: "images",
                          title: "Images",
                          type: "array",
                          of: [
                            {
                              type: "object",
                              fields: [
                                {
                                  name: "image",
                                  title: "Image",
                                  type: "image",
                                  options: { hotspot: true },
                                  sources: [unsplashAssetSource],
                                },
                                {
                                  name: "caption",
                                  title: "Caption",
                                  type: "string",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "stay",
              title: "Stay",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "startsAt",
                  title: "Starts At",
                  type: "number",
                  description: "Time in hours (0-24)",
                },
                {
                  name: "startDate",
                  title: "start Date",
                  type: "datetime",
                  description: "Check In Date",
                },
                {
                  name: "endsAt",
                  title: "Ends At",
                  type: "number",
                  description: "Time in hours (0-24) | Check In Time",
                },
                {
                  name: "endDate",
                  title: "End Date",
                  type: "datetime",
                  description: "Check Out Date",
                },
                {
                  name: "duration",
                  title: "Duration",
                  type: "number",
                },
                {
                  name: "isNight",
                  title: "Is Night?",
                  type: "boolean",
                  initialValue: false,
                },
                {
                  name: "stayDetails",
                  title: "Stay Details",
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "subTitle",
                      title: "Sub Title",
                      type: "string",
                    },
                    {
                      name: "rooms",
                      title: "Rooms",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            {
                              name: "room",
                              title: "Room",
                              type: "string",
                            },
                            {
                              name: "roomDetails",
                              title: "Room Details",
                              type: "string",
                            },
                          ],
                        },
                      ]
                    },
                    {
                      name: "inclusions",
                      title: "Inclusions",
                      type: "object",
                      fields: [
                        {
                          name: "isBreakfastIncluded",
                          title: "Breakfast Included?",
                          type: "boolean",
                          initialValue: false,
                        },
                        {
                          name: "isLunchIncluded",
                          title: "Lunch Included?",
                          type: "boolean",
                          initialValue: false,
                        },
                        {
                          name: "isDinnerIncluded",
                          title: "Dinner Included?",
                          type: "boolean",
                          initialValue: false,
                        },
                      ],
                    }
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "exclusion",
      title: "Exclusion",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "notes",
      title: "Notes",
      type: "array",
      of: [{ type: "block" }],
      description: "Any important notes about the itinerary (optional)",
    },
    {
      name: "fareBreakup",
      title: "Fare Breakup",
      type: "object",
      fields: [
        {
          name: "perAdult",
          title: "Per Adult",
          type: "number",
        },
        {
          name: "perChild",
          title: "Per Child",
          type: "number",
        },
        {
          name: "perInfant",
          title: "Per Infant",
          type: "number",
        },
        {
          name: "tax",
          title: "Tax",
          type: "number",
        },
        {
          name: "taxAmount",
          title: "Tax Amount",
          type: "number",
        }
      ],
    },
  ],
};

export default itinerary;
