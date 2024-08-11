/* eslint-disable no-prototype-builtins */
const multer = require('multer');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const error_handler = require('../utilities/error_handler')
const helper = require('../utilities/helper')
const axios = require('axios')
const sgMail = require('@sendgrid/mail');
const verification = require('../services/restcode');
sgMail.setApiKey('key');


module.exports.fetchPerticularimageidd = async (res, request_body) => {
  try {

    const distinctProductLines = await prisma.furniture.findMany({
      distinct: ['Product_Line'],
      where: {
        Type: {
          in: [request_body.idd],
        },
      },
    });

    const result = await Promise.all(
      distinctProductLines.map(async (productLine) => {
        const record = await prisma.furniture.findFirst({
          where: {
            Product_Line: productLine.Product_Line,
          },
        });
        return record;
      })
    );

    res.send({ data1: result });


  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message)
    return error_handler.throw_service_error(
      parsed_error.message != undefined ? parsed_error.message : parsed_error,
      parsed_error.error != undefined ? parsed_error.error : 'Problem encountered while add',
      parsed_error != null ? parsed_error.manual : null
    )
  }
}
module.exports.add = async (res, formData) => {
  try {
    res.send({ data1: url?.data?.status === 'success' ? 'Successfully send the data' : url?.data?.message })
  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message)
    return error_handler.throw_service_error(
      parsed_error.message != undefined ? parsed_error.message : parsed_error,
      parsed_error.error != undefined ? parsed_error.error : 'Problem encountered while add',
      parsed_error != null ? parsed_error.manual : null
    )
  }
}
module.exports.fetchimage = async (res, request_body) => {
  try {
    console.log(request_body);
    // const distinctProductLines = await prisma.furniture.findMany({
    //   distinct: ['SKU'],
    //   where: {
    //     Type: {
    //       in: [request_body.idd],
    //     },
    //   },
    // });
    const maxPriceBySKU = await prisma.furniture.groupBy({
      by: ['SKU'],
      where: {
        Type: {
          in: [request_body.idd],
        },
      },
      _max: {
        Price: true,
      },
    });

    // Step 2: Fetch the products with the maximum price for each SKU
    const distinctProductLines = await prisma.furniture.findMany({
      where: {
        AND: [
          { Type: { in: [request_body.idd] } },
          {
            OR: maxPriceBySKU.map((item) => ({
              SKU: item.SKU,
              Price: item._max.Price,
            })),
          },
        ],
      },
    });


    if (distinctProductLines) {
      const uniqueBrands = await prisma.furniture.findMany({
        where: {
          Type: {
            in: [request_body.idd],
          },
          Brand: {
            not: null,
          },
        },
        select: {
          Brand: true,
        },
        distinct: ['Brand'],
      });

      const uniqueSubType = await prisma.furniture.findMany({
        where: {
          Type: {
            in: [request_body.idd],
          },
        },
        select: {
          SubType: true,
        },
        distinct: ['SubType'],
      });

      res.send({ data1: distinctProductLines, data2: uniqueBrands, data3: uniqueSubType });
    }

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message)
    return error_handler.throw_service_error(
      parsed_error.message != undefined ? parsed_error.message : parsed_error,
      parsed_error.error != undefined ? parsed_error.error : 'Problem encountered while fetchimage',
      parsed_error != null ? parsed_error.manual : null
    )
  }
}

module.exports.fetchPerticularimage = async (res, request_body) => {
  try {
    console.log(request_body);
    const images = await prisma.furniture.findFirst({
      where: {
        id: request_body.idd,
        Type: request_body.Type,
      },
    });
    // console.log(images);
    const result = await prisma.furniture.findMany({
      where: {
        SKU: images.SKU,
        Brand: images.Brand,
        Type: request_body.Type,
        // You can add more conditions here if needed
      },
    });
    // console.log(result);
    const uniqueProductLines = await prisma.furniture.findMany({
      distinct: ['SKU'],
      where: {
        NOT: {
          SKU: images.SKU,
        },
        Type: request_body.Type,
      },
    });

    let count = 0;
    const results = [];

    for (const productLine of uniqueProductLines) {
      if (count < 4) {
        const record = await prisma.furniture.findFirst({
          distinct: ['SKU'],
          where: {
            NOT: {
              SKU: images.SKU,
            },
            SubType: productLine.SubType,
          },
          orderBy: {
            // Assuming you have a field like createdAt or id which can be used to randomize
            id: 'asc', // or 'desc'
          },
          skip: Math.floor(Math.random() * (await prisma.furniture.count({
            where: {
              NOT: {
                SKU: images.SKU,
              },
              SubType: productLine.SubType,
            },
          }))),
        });

        if (record && !results.find(item => item.SKU === record.SKU)) {
          results.push(record);
          count++;
        }
      } else {
        break; // Stop when the count reaches 4
      }
    }
    res.send({ data1: images, data2: result, data3: results });


  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message)
    return error_handler.throw_service_error(
      parsed_error.message != undefined ? parsed_error.message : parsed_error,
      parsed_error.error != undefined ? parsed_error.error : 'Problem encountered while fetchPerticularimage',
      parsed_error != null ? parsed_error.manual : null
    )
  }
}
// module.exports.fetchsimilarimage = async (res, request_body) => {
//   try {
//      console.log(request_body);

//     const whereClause = {
//       Type: request_body.Types,
//     };

//     if (request_body.SubType !== null) {
//       whereClause.SubType = {
//         equals: request_body.SubType,
//       };
//     }
//     if (request_body.Brand !== null) {
//       whereClause.Brand = {
//         equals: request_body.Brand,
//       };
//     }


//     // const matchingRecords = await prisma.furniture.findMany({
//     //   distinct: ['SKU'],
//     //   where: whereClause,
//     // });
//     const maxPriceBySKU = await prisma.furniture.groupBy({
//       by: ['SKU'],
//       where: whereClause,
//       _max: {
//         Price: true,
//       },
//     });

//     // Step 2: Fetch the products with the maximum price for each SKU
//     const matchingRecords = await prisma.furniture.findMany({
//       where: {
//         AND: [
//           whereClause,
//           {
//             OR: maxPriceBySKU.map((item) => ({
//               SKU: item.SKU,
//               Price: item._max.Price,
//             })),
//           },
//         ],
//       },
//     });
//     // console.log(matchingRecords);

//     // const uniqueProductLines = {};

//     // matchingRecords.forEach((record) => {
//     //   if (!uniqueProductLines.hasOwnProperty(record.SKU)) {
//     //     uniqueProductLines[record.SKU] = record;
//     //   }
//     // });
//     // const result = Object.values(uniqueProductLines);
//     // console.log(result);

//     if (matchingRecords) {
//       const uniqueBrands = await prisma.furniture.findMany({
//         where: {
//           Type: {
//             in: [request_body.Types],
//           },
//           Brand: {
//             not: null,
//           },
//         },
//         select: {
//           Brand: true,
//         },
//         distinct: ['Brand'],
//       });
//       const uniqueSubType = await prisma.furniture.findMany({
//         where: {
//           Type: {
//             in: [request_body.Types],
//           },
//         },
//         select: {
//           SubType: true,
//         },
//         distinct: ['SubType'],
//       });


//       res.send({ data1: matchingRecords, data2: uniqueBrands, data3: uniqueSubType });
//     }
//   } catch (error) {
//     const parsed_error = await helper.check_parsable(error.message)
//     return error_handler.throw_service_error(
//       parsed_error.message != undefined ? parsed_error.message : parsed_error,
//       parsed_error.error != undefined ? parsed_error.error : 'Problem encountered while fetchsimilarimage',
//       parsed_error != null ? parsed_error.manual : null
//     )
//   }
// }
module.exports.fetchsimilarimage = async (res, request_body) => {
  try {
    console.log(request_body);

    const whereClause = {
      Type: request_body.Types,
    };

    if (request_body.SubType && request_body.SubType.length > 0) {
      whereClause.SubType = {
        in: request_body.SubType,
      };
    }
    if (request_body.Brand && request_body.Brand.length > 0) {
      whereClause.Brand = {
        in: request_body.Brand,
      };
    }
    if (request_body.Price) {
      whereClause.Price = {
        gte: request_body.Price.min,
        lte: request_body.Price.max,
      };
    }

    // Step 1: Group by SKU and get the maximum price
    const maxPriceBySKU = await prisma.furniture.groupBy({
      by: ['SKU'],
      where: whereClause,
      _max: {
        Price: true,
      },
    });

    // Step 2: Fetch the products with the maximum price for each SKU
    const matchingRecords = await prisma.furniture.findMany({
      where: {
        AND: [
          whereClause,
          {
            OR: maxPriceBySKU.map((item) => ({
              SKU: item.SKU,
              Price: item._max.Price,
            })),
          },
        ],
      },
    });

    if (matchingRecords) {
      const uniqueBrands = await prisma.furniture.findMany({
        where: {
          Type: {
            in: [request_body.Types],
          },
          Brand: {
            not: null,
          },
        },
        select: {
          Brand: true,
        },
        distinct: ['Brand'],
      });
      const uniqueSubType = await prisma.furniture.findMany({
        where: {
          Type: {
            in: [request_body.Types],
          },
        },
        select: {
          SubType: true,
        },
        distinct: ['SubType'],
      });

      res.send({ data1: matchingRecords, data2: uniqueBrands, data3: uniqueSubType });
    }
  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message)
    return error_handler.throw_service_error(
      parsed_error.message != undefined ? parsed_error.message : parsed_error,
      parsed_error.error != undefined ? parsed_error.error : 'Problem encountered while fetchsimilarimage',
      parsed_error != null ? parsed_error.manual : null
    );
  }
};


module.exports.signup = async (res, request_body) => {
  try {
    console.log(request_body);

    // Check if the email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: request_body.email.toString(),
      }
    });

    if (existingUser) {
      res.send({ data1: 'Email already exists' });
    } else {
      const user = await prisma.user.create({
        data: {
          name: request_body.name.toString(),
          email: request_body.email.toString(),
          password: request_body.password.toString(),
        }
      });
      res.send({ data1: 'Success' });
    }
  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to create account' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while signup!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}
module.exports.login = async (res, request_body) => {
  try {
    console.log(request_body);

    // Check if the email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: request_body.email.toString(),
      }
    });

    if (existingUser) {
      console.log(existingUser);
      if (existingUser?.password === request_body.password) {
        res.send({ data1: 'Success', data2: existingUser });
      } else {
        res.send({ data1: 'Password is wrong' });
      }

    } else {
      res.send({ data1: 'Username is wrong' });
    }
  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to create account' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while signup!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

module.exports.addtowishlist = async (res, request_body) => {
  try {
    console.log(request_body);
    const user = await prisma.user.findUnique({
      where: {
        id: request_body.userid.toString(),
      }
    });

    if (!user) {
      res.send({ data1: 'User not found' });
      return;
    }
    let updatedWishlist = user.wishlist ? user.wishlist.split(',') : [];
    const productIndex = updatedWishlist.indexOf(request_body.Pid);

    if (productIndex !== -1) {
      try {
        updatedWishlist.splice(productIndex, 1);
        const wishlistString = updatedWishlist.join(',');
        await prisma.user.update({
          where: {
            id: request_body.userid.toString(),
          },
          data: {
            wishlist: wishlistString,
          }
        });

        res.send({ data1: 'Product removed from wishlist' });

      } catch (innerError) {
        console.error('Error updating wishlist:', innerError);
        res.send({ data1: 'Failed to remove from wishlist' });
        return;
      }
    } else {
      try {
        updatedWishlist.push(request_body.Pid);
        const wishlistString = updatedWishlist.join(',');
        await prisma.user.update({
          where: {
            id: request_body.userid.toString(),
          },
          data: {
            wishlist: wishlistString,
          }
        });

        res.send({ data1: 'Product added to wishlist' });

      } catch (innerError) {
        console.error('Error updating wishlist:', innerError);
        res.send({ data1: 'Failed to add to wishlist' });
        return;
      }
    }

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to process wishlist' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while processing wishlist!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}
module.exports.updateCart = async (res, request_body) => {
  try {
    const products = request_body?.products;

    // Validate the products array
    if (!Array.isArray(products) || products.length === 0) {
      // Clear the cart if products array is invalid or empty
      try {
        await prisma.user.update({
          where: { id: request_body.userid.toString() },
          data: { cart: '' } // Set cart to an empty string to clear it
        });
        return res.send({ data1: 'Cart cleared successfully' });
      } catch (error) {
        return res.send({ data1: 'Failed to clear cart' });
      }
    }

    // Try to find the user
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          id: request_body.userid.toString(),
        }
      });
    } catch (error) {
      return res.send({ data1: 'Failed to find user' });
    }

    if (!user) {
      return res.send({ data1: 'User not found' });
    }

    // Convert products array to comma-separated string format
    const cartString = products.map(p => `${p.id}:${p.quantity}`).join(',');

    // Try to update the user's cart
    try {
      await prisma.user.update({
        where: { id: request_body.userid.toString() },
        data: { cart: cartString }
      });
      return res.send({ data1: 'Cart updated successfully' });
    } catch (error) {
      return res.send({ data1: 'Failed to update cart' });
    }

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.status(500).send({ data1: 'Failed to update cart' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while updating cart!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

module.exports.getCartProducts = async (res, request_body) => {
  try {

    // Extract userId from the request body
    const userId = request_body?.userid;

    if (!userId) {
      return res.send({ data1: 'User ID is required' });
    }

    // Try to find the user and fetch their cart string
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch (error) {
      return res.send({ data1: 'Failed to find user' });
    }

    if (!user) {
      return res.send({ data1: 'User not found' });
    }

    // Parse the cart string to get product IDs and quantities
    const cartItems = user.cart ? user.cart.split(',') : [];
    const productIds = cartItems.map(item => item.split(':')[0]);

    // Fetch product details from the furniture table
    let products = [];
    try {
      products = await prisma.furniture.findMany({
        where: {
          id: { in: productIds }
        }
      });
    } catch (error) {
      return res.send({ data1: 'Failed to fetch products' });
    }

    // Map products to include quantities
    const cartProducts = products.map(product => {
      const quantity = cartItems.find(item => item.startsWith(product.id))?.split(':')[1] || 0;
      return { ...product, quantity: parseInt(quantity, 10) };
    });

    res.send({ products: cartProducts });

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to retrieve cart products' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while retrieving cart products!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

module.exports.getWishlistDetails = async (res, request_body) => {
  try {
    // Fetch user to get wishlist
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          id: request_body.userid.toString(),
        }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to fetch user' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while fetching user!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }

    if (!user) {
      res.send({ data1: 'User not found' });
      return;
    }

    // Fetch wishlist items
    const wishlistIds = user.wishlist ? user.wishlist.split(',') : [];

    if (wishlistIds.length === 0) {
      res.send({ data1: 'Wishlist is empty' });
      return;
    }

    // Fetch details for all products in the wishlist
    let wishlistProducts;
    try {
      wishlistProducts = await prisma.furniture.findMany({
        where: {
          id: {
            in: wishlistIds,
          }
        }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to fetch wishlist products' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while fetching wishlist products!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }

    res.send({ data1: 'fetched', data2: wishlistProducts });

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to get wishlist details' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while getting wishlist details!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

// module.exports.orderedlist = async (res, request_body) => {
//   try {

//     // Extract userId from the request body
//     const userId = request_body?.userid;

//     if (!userId) {
//       return res.send({ data1: 'User ID is required' });
//     }

//     // Try to find the user and fetch their cart string
//     let user;
//     try {
//       user = await prisma.user.findUnique({
//         where: { id: userId }
//       });
//     } catch (error) {
//       return res.send({ data1: 'Failed to find user' });
//     }

//     if (!user) {
//       return res.send({ data1: 'User not found' });
//     }

//     // Parse the cart string to get product IDs and quantities
//     const orderItems = user.order ? user.order.split(',') : [];
//     const productIds = orderItems.map(item => item.split(':')[0]);

//     // Fetch product details from the furniture table
//     let products = [];
//     try {
//       products = await prisma.furniture.findMany({
//         where: {
//           id: { in: productIds }
//         }
//       });
//     } catch (error) {
//       return res.send({ data1: 'Failed to fetch products' });
//     }

//     // Map products to include quantities
//     const orderProducts = products.map(product => {
//       const quantity = orderItems.find(item => item.startsWith(product.id))?.split(':')[1] || 0;
//       return { ...product, quantity: parseInt(quantity, 10) };
//     });

//     res.send({ data1: 'fetched', products: orderProducts });

//   } catch (error) {
//     const parsed_error = await helper.check_parsable(error.message);
//     res.send({ data1: 'Failed to retrieve cart products' });
//     return error_handler.throw_service_error(
//       parsed_error.message !== undefined ? parsed_error.message : parsed_error,
//       parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while retrieving cart products!',
//       parsed_error !== null ? parsed_error.manual : null
//     );
//   }
// }
module.exports.orderedlist = async (res, request_body) => {
  try {
    // Extract userId from the request body
    const userId = request_body?.userid;

    if (!userId) {
      return res.send({ data1: 'User ID is required' });
    }

    // Try to find the user and fetch their order string
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch (error) {
      return res.send({ data1: 'Failed to find user' });
    }

    if (!user) {
      return res.send({ data1: 'User not found' });
    }

    // Parse the order string to get product IDs and quantities
    const orderItems = user.order ? user.order.split(',') : [];

    // Aggregate quantities for each product ID
    const productDetails = orderItems.map(item => {
      const [productId, quantity, date] = item.split(':');
      return {
        productId,
        quantity: parseInt(quantity, 10),
        date
      };
    });
    
    // Fetch product details from the furniture table
    let products = [];
    try {
      products = await prisma.furniture.findMany({
        where: {
          id: { in: productDetails.map(detail => detail.productId) }
        }
      });
    } catch (error) {
      return res.send({ data1: 'Failed to fetch products' });
    }
    
    // Map products to include quantities and dates separately
    const orderProducts = productDetails.map(detail => {
      const product = products.find(p => p.id === detail.productId);
      return {
        ...product,
        quantity: detail.quantity,
        date: detail.date
      };
    });
    
    res.send({ data1: 'fetched', products: orderProducts });

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to retrieve cart products' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while retrieving cart products!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}


module.exports.userdetails = async (res, request_body) => {
  try {
    console.log(request_body);
    const userId = request_body?.id;

    if (!userId) {
      return res.send({ data1: 'User ID is required' });
    }
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to find user' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while finding user!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }

    if (!user) {
      return res.send({ data1: 'User not found' });
    }
    let updatedUser;
    try {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: request_body.name || user.name,
          email: request_body.email || user.email,
          number: request_body.number || user.number,
          address: request_body.address || user.address,
          address2: request_body.address2 || user.address2,
          city: request_body.city || user.city,
          postCode: request_body.postCode || user.postCode,
          country: request_body.country || user.country,
        }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to update user details' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while updating user details!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }
    res.send({ data1: 'Success', data2: updatedUser });

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to retrieve or update user details' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while retrieving or updating user details!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

module.exports.resetPassword = async (res, request_body) => {
  try {
    console.log(request_body);
    const userId = request_body?.id;

    if (!userId) {
      return res.send({ data1: 'User ID is required' });
    }
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to find user' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while finding user!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }

    if (!user) {
      return res.send({ data1: 'User not found' });
    }
    let updatedUser;
    try {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          password: request_body.password,
        }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to update user password' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while updating user details!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }
    res.send({ data1: 'success' });

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to update user password' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while retrieving or updating user details!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

module.exports.forgetpassword = async (res, request_body) => {
  try {
    console.log(request_body);

    // Check if the email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: request_body.email.toString(),
      }
    });
    console.log(existingUser);

    if (existingUser) {
      try {
        const response = await axios({
          method: "post",
          url: "https://api.sendgrid.com/v3/mail/send",
          headers: {
            Authorization: `Bearer key`
          },
          data: {
            personalizations: [
              {
                to: [
                  {
                    email: request_body.email,
                    name: ``
                  }
                ]
              }
            ],
            from: {
              email: "senderemail",
              name: `sendere name`
            },
            reply_to: {
              email: "sender email",
              name: ``
            },
  
            subject: `Link to reset password`,
            content: [
              {
                type: "text/html",
                value: verification.forget_password(`link for rest`)
              }
            ]
          }
        });
    
        // Handle success response
        console.log('Email sent successfully:', response.data);
        res.send({ data1: 'success' });
      } catch (error) {
        console.log('error:', error.data);
        res.send({ data1: 'Failed to send resetlink' });

      }
      
    } else {
      res.send({ data1: 'Account not exist' });
    }
  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to fetch account' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while forgetpassword!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}
module.exports.orderplaced = async (res, request_body) => {
  try {
    console.log(request_body);
    const userId = request_body?.id;

    if (!userId) {
      return res.send({ data1: 'Problem encountered while finding user' });
    }
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Problem encountered while finding user' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while finding user!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }

    if (!user) {
      return res.send({ data1: 'User not found' });
    }
    let updatedUser;
    const products = request_body?.cartProducts;
    const todayDate = new Date();
    const formattedDate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
    const newOrderString = products.map(p => `${p.id}:${p.quantity}:${formattedDate}`).join(',');
    const previousOrder = user?.order || '';
    const updatedOrderString = previousOrder ? `${newOrderString},${previousOrder}` : newOrderString;
    try {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: request_body.name,
          email: request_body.email,
          number: request_body.number,
          address: request_body.address,
          address2: request_body.address2,
          city: request_body.city,
          postCode: request_body.postCode,
          country: request_body.country,
          cart: '',
          order: updatedOrderString,
        }
      });

    } catch (error) {
      const parsed_error = await helper.check_parsable(error.message);
      res.send({ data1: 'Failed to update user details' });
      return error_handler.throw_service_error(
        parsed_error.message !== undefined ? parsed_error.message : parsed_error,
        parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while updating user details!',
        parsed_error !== null ? parsed_error.manual : null
      );
    }
    const newArray = request_body?.cartProducts.map(product => ({
      p: product.Category && product.Category.trim() !== '' ? product.Category : product.Title,
      Manufacturer: product.Brand,
      quantity: product.quantity,
      Price: product.Price,
      SubType: product.SubType
    }));
    const mainFormdata = {
      firstName: request_body.name,
      lastName: null,
      phoneNumber: request_body.number,
      email: request_body.email,
      address: request_body.address,
      city: request_body.city,
      country: request_body.country,
      zip: request_body.postCode,
      products: newArray,
      total: request_body.total,
      subtotal: request_body.subtotal,
      couponApplied: request_body.couponApplied,
      discountCode: request_body.discountCode,
      note: request_body.cartNote,
      keepMeUpdated: true,
    }
    console.log(mainFormdata);
    console.log(url?.data);
    res.send({ data1: 'success', data2: updatedUser });

  } catch (error) {
    const parsed_error = await helper.check_parsable(error.message);
    res.send({ data1: 'Failed to retrieve or update user details' });
    return error_handler.throw_service_error(
      parsed_error.message !== undefined ? parsed_error.message : parsed_error,
      parsed_error.error !== undefined ? parsed_error.error : 'Problem encountered while retrieving or updating user details!',
      parsed_error !== null ? parsed_error.manual : null
    );
  }
}

