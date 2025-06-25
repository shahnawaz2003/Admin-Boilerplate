import { useGetQuery } from "../../../services/apiService"
const ProductsPage = () => {
    const { data, isLoading, error } = useGetQuery({
        path: "/posts",
    })
  return (

    <div>
        <h1>Products</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
            <ul>
            {data.map(user => (
                <li key={user.id}>
                    <h2 >{user.title}</h2>
                    <p className="text-gray-300 bg-black">{user.body}</p>
                </li>
            ))}
            </ul>
        )}
    </div>
  )
}

export default ProductsPage
