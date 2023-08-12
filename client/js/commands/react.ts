import {ClientTagKey} from "../../../server/models/client-tags";
import socket from "../socket";
import {store} from "../store";

function input(args: string[]) {
	if (!store.state.activeChannel) {
		return false;
	}

	const activeChannel = store.state.activeChannel.channel;
	let messageIndex = activeChannel.messages.length - 1;
	let reaction: string;

	// long form: [message index] [reaction]
	if (args.length > 1) {
		let relIndex = +args[0];
		if (relIndex >= 0) {
			return false;
		}

		messageIndex = activeChannel.messages.length + relIndex;
		reaction = args[1];
		// short form: [reaction] to last message
	} else if (args.length > 0) {
		reaction = args[0];
	} else {
		return false;
	}

	const message = activeChannel.messages[messageIndex];

	if (!message.server_tags || !message.server_tags.msgId) {
		return;
	}

	socket.emit("input", {
		target: activeChannel.id,
		text: `/tagmsg +${ClientTagKey.DRAFT_REPLY}=${message.server_tags.msgId} +${ClientTagKey.DRAFT_REACT}=${reaction}`,
	});

	return true;
}

export default {input};
