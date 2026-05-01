export const openapiDocument = {
  openapi: "3.0.0",
  info: {
    title: "İlker Uzunalan Professional Web Page API",
    description: "Backend API documentation for İlker Uzunalan's photography portfolio and professional website. Includes endpoints for authentication, project management, blog posts, and dynamic content sections.",
    version: "1.0.0",
    contact: {
      name: "API Support"
    }
  },
  servers: [
    {
      url: "/api",
      description: "Base URL for all API routes"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  tags: [
    { name: "Auth", description: "Authentication & Authorization endpoints" },
    { name: "Projects", description: "Portfolio projects and details management" },
    { name: "Hero", description: "Homepage hero section management" },
    { name: "About Us", description: "About Us section management" },
    { name: "Blog", description: "Blog posts management" },
    { name: "Info", description: "Personal information and social links" }
  ],
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User Login",
        description: "Authenticate a user and return a JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "admin@example.com" },
                  password: { type: "string", format: "password", example: "secret123" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Successful login with token" },
          "400": { description: "Missing email or password" },
          "401": { description: "Invalid credentials" }
        }
      }
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "User Logout",
        description: "Logs out the current user",
        responses: {
          "200": { description: "Successfully logged out" }
        }
      }
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get Current User Profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "User profile data returned" },
          "401": { description: "Unauthorized" },
          "404": { description: "User not found" }
        }
      }
    },
    "/projects": {
      get: {
        tags: ["Projects"],
        summary: "Get All Projects",
        responses: {
          "200": { description: "A list of all portfolio projects" },
          "500": { description: "Internal server error" }
        }
      },
      post: {
        tags: ["Projects"],
        summary: "Create a New Project",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  cover_img: { type: "string", format: "binary", description: "The cover image for the project" },
                  detail_imgs: { type: "array", items: { type: "string", format: "binary" }, description: "Detailed images for the project (max 10)" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" },
                  video_urls: { type: "array", items: { type: "string" }, description: "Array of video URLs (YouTube, etc.)" },
                  detail_data: { type: "string", description: "JSON stringified array of project details: [{url: '...', type: 'image' | 'video'}]" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Project successfully created" },
          "500": { description: "Internal server error" }
        }
      }
    },
    "/projects/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Get Project By ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: {
          "200": { description: "Project details returned" },
          "404": { description: "Project not found" },
          "500": { description: "Internal server error" }
        }
      },
      put: {
        tags: ["Projects"],
        summary: "Update a Project",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  cover_img: { type: "string", format: "binary" },
                  detail_imgs: { type: "array", items: { type: "string", format: "binary" } },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" },
                  video_urls: { type: "array", items: { type: "string" } },
                  detail_data: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Project successfully updated" },
          "500": { description: "Internal server error" }
        }
      },
      delete: {
        tags: ["Projects"],
        summary: "Delete a Project",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: {
          "204": { description: "Project deleted successfully" },
          "500": { description: "Internal server error" }
        }
      }
    },
    "/hero/all": {
      get: {
        tags: ["Hero"],
        summary: "Get All Hero Sections",
        responses: { "200": { description: "List of hero content" } }
      }
    },
    "/hero/add": {
      post: {
        tags: ["Hero"],
        summary: "Create Hero Section",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Created successfully" },
          "400": { description: "Missing image file" },
          "500": { description: "Internal server error" }
        }
      }
    },
    "/hero/update/{id}": {
      put: {
        tags: ["Hero"],
        summary: "Update Hero Section",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Updated successfully" } }
      }
    },
    "/hero/delete/{id}": {
      delete: {
        tags: ["Hero"],
        summary: "Delete Hero Section",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "204": { description: "Deleted successfully" } }
      }
    },
    "/aboutUs/aboutUs": {
      get: {
        tags: ["About Us"],
        summary: "Get About Us Information",
        responses: { "200": { description: "About Us data" } }
      }
    },
    "/aboutUs/create": {
      post: {
        tags: ["About Us"],
        summary: "Create About Us Content",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Created successfully" } }
      }
    },
    "/aboutUs/update/{id}": {
      put: {
        tags: ["About Us"],
        summary: "Update About Us Content",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Updated successfully" } }
      }
    },
    "/aboutUs/delete/{id}": {
      delete: {
        tags: ["About Us"],
        summary: "Delete About Us Content",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "204": { description: "Deleted successfully" } }
      }
    },
    "/blog/blogs": {
      get: {
        tags: ["Blog"],
        summary: "Get All Blogs",
        responses: { "200": { description: "List of all blog posts" } }
      }
    },
    "/blog/blog/{id}": {
      get: {
        tags: ["Blog"],
        summary: "Get a Specific Blog",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Blog post data" } }
      }
    },
    "/blog/create": {
      post: {
        tags: ["Blog"],
        summary: "Create a New Blog Post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Blog post created" } }
      }
    },
    "/blog/update/{id}": {
      put: {
        tags: ["Blog"],
        summary: "Update a Blog Post",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  title_tr: { type: "string" },
                  title_en: { type: "string" },
                  description_tr: { type: "string" },
                  description_en: { type: "string" },
                  button_title_tr: { type: "string" },
                  button_title_en: { type: "string" },
                  button_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Blog post updated" } }
      }
    },
    "/blog/delete/{id}": {
      delete: {
        tags: ["Blog"],
        summary: "Delete a Blog Post",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "204": { description: "Blog post deleted" } }
      }
    },
    "/info/myinfo": {
      get: {
        tags: ["Info"],
        summary: "Get Personal Information",
        responses: { "200": { description: "Personal information data" } }
      }
    },
    "/info/add": {
      post: {
        tags: ["Info"],
        summary: "Add Personal Information",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  phone_number: { type: "string" },
                  email: { type: "string" },
                  linkedin_url: { type: "string" },
                  instagram_url: { type: "string" },
                  youtube_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Information added" } }
      }
    },
    "/info/update/{id}": {
      put: {
        tags: ["Info"],
        summary: "Update Personal Information",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  phone_number: { type: "string" },
                  email: { type: "string" },
                  linkedin_url: { type: "string" },
                  instagram_url: { type: "string" },
                  youtube_url: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Information updated" } }
      }
    },
    "/info/delete/{id}": {
      delete: {
        tags: ["Info"],
        summary: "Delete Personal Information",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "204": { description: "Information deleted" } }
      }
    }
  }
};
