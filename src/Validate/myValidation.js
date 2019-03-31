import Joi from 'joi-browser'
export default function createValidator(schema) {
    return values => {//i think this values is taken from the form redux
        //console.log(Joi.validate(values, schema, { abortEarly: false }));//this will show exactly what is happening
        const result = Joi.validate(values, schema, { abortEarly: false });
        if (result.error === null) {
            return {};
        }

        const errors = result.error.details.reduce((all, cur) => {
            const allErrors = Object.assign({}, all);//an alternative way is written in javascript reducer file
            const path = cur.path[cur.path.length - 1];
            const message = cur.message;
            if (Object.prototype.hasOwnProperty.call(allErrors, path)) {//to check if allError object has a certian property
                allErrors[path] += message;
            } else {
                allErrors[path] = message;
            }
            return allErrors;
        }, {});

        return errors;
    };
}

//than the redux form will take the error object with all of its properties
//which are the same name as the input Fields name so it will give the render
//the render property an extra property which is meta and the errors from here are written in there