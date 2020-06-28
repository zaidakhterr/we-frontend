import React from 'react';
import 'antd/dist/antd.less';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.less'

const SearchBar = () => {
	const { Search } = Input;
	const suffix = (
		<SearchOutlined
		  	style={{
		  		fontSize: 16,	
		      	color: 'white'
		    }}
	  	/>
	);
		return (
			<div>
				<Search
					type="primary"
			      	placeholder="Search Question"
			      	enterButton={suffix}
			      	onSearch={value => console.log(value)}
			    />
		    </div>
		);		
}

export default SearchBar;