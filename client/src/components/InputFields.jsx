import {useId} from 'react';

const InputField = ({ label,className, name, type = "text", onChange, value, ...props }) => {
    const id = useId()
	return (
		<div className={className}>
			<label htmlFor={id} className='block text-md font-medium text-gray-700'>
				{label}
			</label>
			<input
				className=' p-2 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
                {...props}
			/>
		</div>
	);
};

export default InputField;