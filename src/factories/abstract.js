/**
 * Abstract factory module.
 * @module factories/abstract
 */

/**
 * Abstract class for factories.
 */
export class Abstract
{
	/**
	 * Construct the abstract factory object
	 * @param {object} settings
	 */
	constructor(settings) {
		this.settings = settings;
	}

	/**
	 * Construct the abstract factory object
	 * @param {object} data object
	 */
	setData(data) {
		this.data = new this.settings.model(data);
	}

	/**
	 * Retrieve the object data
	 * @return {object}
	 */
	getData() {
		return this.data;
	}

	/**
	 * Store the details of error
	 * @param {object} details
	 * @return {boolean}
	 */
	setError(details) {
		this.error = details;

		return false;
	}

	/**
	 * Retrieve the error details
	 * @return {object}
	 */
	getError() {
		return this.error;
	}

	/**
	 * Validate the object before some MongoDB action
	 * @return {boolean}
	 */
	validate() { return true; }
}