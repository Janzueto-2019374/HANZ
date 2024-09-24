const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.log(err));

// Definir rutas básicas
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', protect, orderRoutes);

// Marcar como pagada
router.put('/:id/pay', async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
  
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  });
  
  // Marcar como entregada
  router.put('/:id/deliver', async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
  
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  });
  
