
  const getMessage = async () => {
    const response = await fetch('/graphql',{
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        variables: {},
        query: `query {
            message
          }`,
      }),
    })
    return await response.json()
  }
  
  export default getMessage