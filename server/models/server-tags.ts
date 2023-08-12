import _ from "lodash";

export enum ServerTagKey {
	// https://ircv3.net/specs/extensions/message-ids
	MESSAGE_ID = "msgid",
	// https://ircv3.net/specs/extensions/server-time
	SERVER_TIME = "time",
	// https://ircv3.net/specs/extensions/account-tag
	ACCOUNT_TAG = "account",
}

export class ServerTags {
	msgId?: string;
	serverTime?: string; // todo: Date
	account?: string;
	rawTags: Record<string, string>;

	public constructor(rawClientTags: Record<string, string>) {
		this.rawTags = rawClientTags;

		this.msgId = this.get(ServerTagKey.MESSAGE_ID);
		this.serverTime = this.get(ServerTagKey.SERVER_TIME);
		this.account = this.get(ServerTagKey.ACCOUNT_TAG);
	}

	public get(key: string): string | undefined {
		return this.rawTags[key];
	}

	public has(key: string): boolean {
		return Object.prototype.hasOwnProperty.call(this.rawTags, key);
	}
}
