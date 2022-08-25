
const getProducts = async ({ pageParam = 0,...props }) => {
  const {limit=5} = props.meta
  return await fetch("/graphql",{
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      variables: {},
      query: `query {
        products(offset:${pageParam}, limit:${limit}) {
          sku
          name
          description
          category
          color
          price
          inStock
        }
        productCount
      }`,
    }),
  })
    .then(res => res.json())
}

export default getProducts