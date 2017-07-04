/**
 * API helper 
 *
 * @module helper/api
 */

/**
 * Remove and alter some keys on object before send it
 * @param {object} data
 * @return {object} The treated object
 */
export function prepareData(data) {
	// treat array
	if (data instanceof Array) {
		return data.map(prepareData);
	}

	if (data['_id'] != undefined) {
		data._doc['id'] = data['id'];
		delete data._doc['_id'];
	}

	if (data['__v']) {
		delete data._doc['__v'];
	}

	return data;
}