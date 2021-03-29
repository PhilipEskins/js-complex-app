import Search from './modules/Search'
import Chat from './modules/chat'

if (document.querySelector("#chat-wrapper")) {
    new Chat()
}
if (document.querySelector(".header-search-icon")) {new Search()}