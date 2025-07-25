import {create} from 'apisauce';
import storage from "../auth/storage";
import {URL_BASE} from "../utils/urls";

const apiClient = create({
	baseURL: URL_BASE
});

apiClient.addAsyncRequestTransform(async (request) => {
	const token = await storage.getToken();
	if (!token) return;
	request.headers['Authorization'] = `Bearer ${token}`;
});
apiClient.addAsyncResponseTransform(async (response) => {
	// response.data.forEach((business => {
	// 	delete business['branchPreferences'];
	// 	delete business['branchesEventTypes'];
	// }));
});

export default apiClient;
