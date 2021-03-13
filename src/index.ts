import { getInput, setFailed } from '@actions/core';
import { get as getHttps } from 'https';
import { get as getHttp } from 'http';
import type { IncomingMessage } from 'http';

enum Protocol {
	http = 'http:',
	https = 'https:',
}

try {
	const url = new URL(getInput('url'));

	const handleResponse = ({ statusCode }: IncomingMessage) => {
		if (statusCode !== 200) {
			throw new Error(`Site responses with HTTP code: ${statusCode}`!);
		}
	};

	get(url, handleResponse);
} catch (error) {
	setFailed(error.message);
}

function get(url: URL, callback: (response: IncomingMessage) => void) {
	switch (url.protocol) {
		case Protocol.http:
			getHttp(url, callback);
			break;
		case Protocol.https:
			getHttps(url, callback);
			break;
		default:
			throw new Error(`Protocol ${url.protocol} is not implemented yet!`);
	}
}
