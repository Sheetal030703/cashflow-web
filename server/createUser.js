const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // make sure this path is correct

mongoose.connect('mongodb://127.0.0.1:27017/cashflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const hashedPassword = await bcrypt.hash('pookie123', 10);
  const user = new User({ username: 'pookie', password: hashedPassword });
  await user.save();
  console.log('✅ User created successfully!');
  mongoose.disconnect();
})
.catch((err) => console.error('❌ Error:', err));
