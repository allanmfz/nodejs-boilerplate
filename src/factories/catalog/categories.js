import {Categories} from '../../models/catalog/categories';
import {Router}     from 'express';
import {Abstract}   from '../abstract'
import slug  		from 'slug';

/**
 * Category factory class for building/fetching/validating objects
 * @extends Abstract
 */
export class CategoryFactory extends Abstract
{
	/**
	 * Construct the factory object
	 */
	constructor() {
		super({
			model: Categories
		});
	}

	/**
	 * Validate the data before inserting/updating into MongoDB
	 * @return {boolean} The result of validation
	 */
	validate() {
		let data = this.getData();
		if (!Object.keys(data).length) {
			return this.setError({ok: false, msg: 'Empty data object.'});
		}
		
		if (!/^[0-9a-z]{24}$/.test(data['_id'])) {
			return this.setError({ok: false, msg: 'Invalid _id value.'});
		}

		let result = data.validateSync();
		if (!result) {
			return true;
		}

		let fieldsErrors = new Object();
		for (let key in result.errors) {
			fieldsErrors[key] = result.errors[key].message;
		}

		return this.setError({
			ok: false,
			msg: 'Validation error.',
			fields: fieldsErrors
		});
	}

	/**
	 * Slugfy the category name before insert/update operation
	 */
	setData(data) {
		if (data.name) {
			data.slug = slug(data.name, {lower: true});
		}

		super.setData(data);
	}

	/**
	 * Insert object into MongoDB
	 * @return {object} The result of insert
	 */
	insert() {
		if (!this.validate()) {
			return false;
		}

		this.data.save();

		return true;
	}

	/**
	 * Update a MongoDB object
	 * @return {object} The result of update
	 */
	update() {
		if (!this.validate()) {
			return false;
		}

		Categories.update(
			{_id: this.data['_id']},
			{$set: this.data},
			(err, category) => {
				// @TODO
				console.log(category);
			}
		);

		return true;
	}
}