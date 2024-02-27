const GlobalFilter = ({ filtering, setFiltering, placeholder = "Search" }) => {
	return (
		<input
			type="search"
			className="form-control"
			value={filtering || ''}
			placeholder={placeholder}
			onChange={e => setFiltering(e.target.value)}
		/>
	);
};

export default GlobalFilter;