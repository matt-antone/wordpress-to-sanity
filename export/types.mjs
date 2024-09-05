export default [
  {
    name: "home",
    title: "Home",
    type: "document",
    options: {
      singleton: true,
    },
    fields: [
      {
        name: "date",
        title: "Date",
        type: "datetime",
        options: {
          initialValue: "2024-08-20T00:40:30.291Z",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "description",
        title: "Meta Description",
        type: "text",
        rows: 4,
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "featuredImage.src",
      },
    },
  },
  {
    name: "settings",
    title: "Settings",
    type: "document",
    options: {
      singleton: true,
    },
    fields: [
      {
        type: "string",
        name: "siteTitle",
        title: "Site Title",
      },
      {
        type: "text",
        name: "siteDescription",
        title: "Site Description",
      },
      {
        type: "image",
        name: "siteLogo",
        title: "Site Logo",
        options: {
          hotspot: true,
        },
      },
    ],
    preview: {
      select: {
        title: "siteTitle",
      },
    },
  },
  {
    name: "page",
    title: "Pages",
    type: "document",
    fields: [
      {
        name: "date",
        title: "Date",
        type: "datetime",
        options: {
          initialValue: "2024-08-20T00:40:30.291Z",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "description",
        title: "Meta Description",
        type: "text",
        rows: 4,
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "featuredImage.src",
      },
    },
  },
  {
    name: "posts",
    title: "Posts",
    type: "document",
    fields: [
      {
        name: "date",
        title: "Date",
        type: "datetime",
        options: {
          initialValue: "2024-08-20T00:40:30.291Z",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "description",
        title: "Meta Description",
        type: "text",
        rows: 4,
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        fields: [
          {
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description:
              "Alternative text for screen readers. Usually a short summary of the image.",
          },
        ],
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        weak: true,
        to: [
          {
            type: "category",
          },
        ],
        description: "Select a category for this post.",
      },
      {
        title: "Tags",
        name: "tags",
        type: "array",
        of: [
          {
            type: "string",
          },
        ],
        options: {
          layout: "tags",
        },
      },
      {
        type: "url",
        name: "video",
        title: "Featured Video",
        description: "Enter the URL.",
      },
      {
        type: "array",
        name: "practices",
        title: "Linked Profiles",
        of: [
          {
            type: "profile",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "featuredImage",
      },
    },
  },
  {
    name: "profile",
    title: "Profiles",
    type: "document",
    fields: [
      {
        name: "date",
        title: "Date",
        type: "datetime",
        options: {
          initialValue: "2024-08-20T00:40:30.291Z",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
        description: "Enter the email address.",
      },
      {
        name: "linkedin",
        title: "LinkedIn",
        type: "url",
        description: "Enter the URL.",
      },
      {
        name: "youtube",
        title: "YouTube",
        type: "url",
        description: "Enter the URL.",
      },
      {
        type: "array",
        name: "practices",
        title: "Linked Practice Areas",
        of: [
          {
            type: "practice",
          },
        ],
      },
      {
        name: "thumbnail",
        title: "Thumbnail",
        type: "image",
        fields: [
          {
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description:
              "Alternative text for screen readers. Usually a short summary of the image.",
          },
        ],
      },
      {
        name: "profileImage",
        title: "Profile Image",
        type: "image",
        fields: [
          {
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description:
              "Alternative text for screen readers. Usually a short summary of the image.",
          },
        ],
      },
      {
        name: "bio",
        title: "Biography",
        type: "blockContent",
      },
      {
        name: "education",
        title: "Education",
        type: "blockContent",
      },
      {
        name: "publication",
        title: "Publications",
        type: "blockContent",
      },
      {
        name: "membership",
        title: "Memberships",
        type: "blockContent",
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "featuredImage.src",
      },
    },
  },
  {
    name: "practice",
    title: "Practice Areas",
    type: "document",
    fields: [
      {
        name: "date",
        title: "Date",
        type: "datetime",
        options: {
          initialValue: "2024-08-20T00:40:30.291Z",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "description",
        title: "Meta Description",
        type: "text",
        rows: 4,
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        fields: [
          {
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description:
              "Alternative text for screen readers. Usually a short summary of the image.",
          },
        ],
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        weak: true,
        to: [
          {
            type: "category",
          },
        ],
        description: "Select a category for this post.",
      },
      {
        title: "Tags",
        name: "tags",
        type: "array",
        of: [
          {
            type: "string",
          },
        ],
        options: {
          layout: "tags",
        },
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "featuredImage",
      },
    },
  },
  {
    name: "location",
    title: "Locations",
    type: "document",
    fields: [
      {
        name: "date",
        title: "Date",
        type: "datetime",
        options: {
          initialValue: "2024-08-20T00:40:30.291Z",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "order",
        title: "Order",
        type: "number",
        description:
          "Locations are automatically sorted by order. 0 is the default.",
        initialValue: 0,
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        fields: [
          {
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description:
              "Alternative text for screen readers. Usually a short summary of the image.",
          },
        ],
      },
      {
        name: "address1",
        title: "Address 1",
        type: "string",
      },
      {
        name: "address2",
        title: "Address 2",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "state",
        title: "State",
        type: "string",
      },
      {
        name: "zip",
        title: "Zip",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "featuredImage",
      },
    },
  },
  {
    title: "Block Content",
    name: "blockContent",
    type: "array",
    of: [
      {
        type: "image",
      },
      {
        title: "Block",
        type: "block",
        styles: [
          {
            title: "Normal",
            value: "normal",
          },
          {
            title: "H1",
            value: "h1",
          },
          {
            title: "H2",
            value: "h2",
          },
          {
            title: "H3",
            value: "h3",
          },
          {
            title: "H4",
            value: "h4",
          },
          {
            title: "Quote",
            value: "blockquote",
          },
        ],
        lists: [
          {
            title: "Bullet",
            value: "bullet",
          },
        ],
        marks: {
          decorators: [
            {
              title: "Strong",
              value: "strong",
            },
            {
              title: "Emphasis",
              value: "em",
            },
          ],
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "url",
                },
              ],
            },
          ],
        },
      },
      {
        type: "youtube",
      },
      {
        type: "vimeo",
      },
    ],
  },
  {
    name: "category",
    title: "Categories",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
    ],
  },
  {
    name: "tag",
    title: "Tags",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
    ],
  },
  {
    name: "youtube",
    title: "Youtube",
    type: "object",
    fields: [
      {
        name: "url",
        title: "URL",
        type: "url",
      },
    ],
    preview: {
      select: {
        url: "url",
      },
    },
  },
  {
    type: "image",
    name: "linkImage",
    title: "Image",
    preview: {
      select: {
        alt: "alt",
        media: "asset",
      },
    },
    fields: [
      {
        title: "Alt Text",
        name: "alt",
        type: "string",
      },
      {
        type: "url",
        name: "url",
        title: "URL",
        description: "",
      },
    ],
  },
  {
    name: "navigation",
    title: "Navigation",
    type: "document",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Title",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "items",
        type: "array",
        title: "Navigation items",
        of: [
          {
            type: "navigationItem",
          },
        ],
      },
    ],
  },
  {
    name: "navLink",
    type: "object",
    title: "Link",
    fields: [
      {
        title: "Internal Link",
        name: "internalLink",
        description: "Select pages for navigation",
        type: "reference",
        weak: true,
        to: [
          {
            type: "page",
          },
        ],
      },
      {
        name: "relativePath",
        type: "string",
        title: "Relative Path",
      },
      {
        name: "externalUrl",
        title: "External URL",
        description: "Use fully qualified URLS for external link",
        type: "url",
      },
    ],
  },
  {
    name: "navigationItem",
    title: "Navigation Item",
    type: "object",
    fields: [
      {
        name: "text",
        type: "string",
        title: "Navigation Text",
      },
      {
        name: "navigationItemUrl",
        type: "navLink",
        title: "Navigation Item URL",
      },
      {
        name: "children",
        type: "array",
        title: "Children",
        of: [
          {
            type: "navigationItem",
          },
        ],
      },
    ],
  },
  {
    name: "vimeo",
    title: "Vimeo",
    type: "object",
    fields: [
      {
        name: "url",
        title: "URL",
        type: "url",
      },
    ],
    preview: {
      select: {
        url: "url",
      },
    },
  },
];
