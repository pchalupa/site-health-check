import { getInput, setFailed } from '@actions/core';
import { get as getHttps } from 'https';
import { get as getHttp, IncomingMessage } from 'http';

enum Protocol {
	http = 'http:',
	https = 'https:',
}

try {
	const url = new URL(getInput('url'));

	const handleResponse = (response: IncomingMessage) => {
		if (response.statusCode !== 200) {
			throw new Error('Failed to get!');
		}
	};

	switch (url.protocol) {
		case Protocol.http:
			getHttp(url, handleResponse);
			break;
		case Protocol.https:
			getHttps(url, handleResponse);
			break;
		default:
			throw new Error('not implemented');
	}
} catch (error) {
	setFailed(error.message);
}
