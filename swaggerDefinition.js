module.exports = {
info: {
    title: 'Classroom API',
    version: '1.0.0',
    description: 'API documentation for the Classroom application',
    },
    basePath: '/',
    schemes: ['http', 'https'], 
    consumes: ['application/json'], 
    produces: ['application/json'], 
    paths: {
    '/signup': {
        post: {
          summary: 'Create a new user',
          tags: ['User'],
          parameters: [
            {
              name: 'User Data',
              in: 'body',
              description: 'User data for signup',
              required: true,
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  password: { type: 'string' },
                  userType: { type: 'string' },
                },
                required: ['id', 'name', 'password', 'userType'],
              },
            },
          ],
          requestBody: {
            description: 'User data for signup',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    password: { type: 'string' },
                    userType: { type: 'string' },
                  },
                  required: ['id', 'name', 'password', 'userType'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      user: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          userType: { type: 'string' },
                        }, }, },}, },}, },
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },
                    },}, },},},
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },
                 },}, },},}, }, },},
      '/login': {
        post: {
          summary: 'User login',
          tags: ['User'],
          parameters: [
            {
              name: 'User Credentials',
              in: 'body',
              description: 'User credentials for login',
              required: true,
              schema: {
                type: 'object',
                properties: {
                 id: { type: 'string' },
                    name: { type: 'string' },
                    password: { type: 'string' },
                    userType: { type: 'string' },
                },
                required: ['id', 'password','name','userType'],
              },}, ],
          requestBody: {
            description: 'User credentials for login',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    password: { type: 'string' },
                  },
                  required: ['id', 'password'],
                },},},},
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      user: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          userType: { type: 'string' },
                        }, },},}, }, }, },
            401: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },
                    },},  }, }, },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },
                    },},},},}, },}, },
      '/upload': {
        post: {
          summary: 'Upload a file',
          tags: ['File'],
          parameters: [
            {
              name: 'File',
              in: 'formData',
              description: 'File to be uploaded',
              required: true,
              type: 'file',
            },
          ],
          requestBody: {
            description: 'File to be uploaded',
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: { type: 'string', format: 'binary' },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'File uploaded successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      filename: { type: 'string' },
     },},},  },},
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },},}, }, },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },
                    }, },},}, }, }, }, }, },
    };
  
