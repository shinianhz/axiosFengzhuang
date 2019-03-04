import User from './components/user/index.vue';
import Home from './components/Home.vue';
import News from './components/news/index.vue';
import Cate from './components/cate/cate.vue';
import Procomment from './components/comments/procomment.vue';
import Newscomment from './components/comments/newscomment.vue';
import Order from './components/order/order.vue';
import Cart from './components/cart/cart.vue';
import Product from './components/product/product.vue';



export const routes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
    { path: '/news', component: News },
    { path: '/cate', component: Cate },
    { path: '/procomment', component: Procomment },
    { path: '/newscomment', component: Newscomment },
    { path: '/order', component: Order },
    { path: '/cart', component: Cart },
    { path: '/product', component: Product },


];