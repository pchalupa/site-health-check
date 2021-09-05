import { getInput, setFailed } from '@actions/core';
import { get as getHttps } from 'https';
import { get as getHttp, IncomingMessage } from 'http';

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

	switch (url.protocol) {
		case Protocol.http:
			getHttp(url, handleResponse);
			break;
		case Protocol.https:
			getHttps(url, handleResponse);
			break;
		default:
			throw new Error(`Protocol ${url.protocol} is not implemented yet!`);
	}
} catch (error) {
	if (error instanceof Error) {
		setFailed(error.message);
	}

	setFailed('There was a problem with processing your request.');
}
