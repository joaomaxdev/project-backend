const { Category } = require('../models');

// Função para buscar categorias com filtros e paginação
const searchCategories = async (req, res) => {
  try {
    // Desestruturação dos parâmetros da query com valores padrão
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    // Configurações padrão da consulta
    const queryOptions = {
      where: {},
      attributes: [],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    };

    // Se limit for -1, remove limite e offset
    if (limit === '-1') {
      delete queryOptions.limit;
      delete queryOptions.offset;
    }

    // Limitar os campos retornados
    if (fields) {
      queryOptions.attributes = fields.split(',');
    } else {
      queryOptions.attributes = ['id', 'name', 'slug', 'use_in_menu'];
    }

    // Filtro por use_in_menu se fornecido
    if (use_in_menu) {
      queryOptions.where.use_in_menu = use_in_menu === 'true';
    }

    // Buscar categorias com base nos filtros aplicados
    const categories = await Category.findAll(queryOptions);

    // Contar o total de categorias para paginação
    const total = await Category.count({ where: queryOptions.where });

    // Formatar e retornar a resposta
    res.status(200).json({
      data: categories,
      total,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Função para obter uma categoria pelo ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar categoria pelo ID
    const category = await Category.findByPk(id, {
      attributes: ['id', 'name', 'slug', 'use_in_menu'],
    });

    // Se a categoria não for encontrada, retornar 404
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Retornar dados da categoria
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Função para criar uma nova categoria
const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required' });
    }

    // Criar uma nova categoria
    const newCategory = await Category.create({
      name,
      slug,
      use_in_menu: use_in_menu || false, // Valor padrão é false se não fornecido
    });

    // Retornar a categoria criada com status 201
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Função para atualizar uma categoria existente
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required' });
    }

    // Buscar categoria pelo ID
    const category = await Category.findByPk(id);

    // Verificar se a categoria existe
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Atualizar campos da categoria
    category.name = name;
    category.slug = slug;
    category.use_in_menu = use_in_menu;

    // Salvar alterações
    await category.save();

    // Retornar 204 No Content para sucesso sem resposta
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Função para deletar uma categoria
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar categoria pelo ID
    const category = await Category.findByPk(id);

    // Verificar se a categoria existe
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Deletar categoria
    await category.destroy();

    // Retornar 204 No Content para sucesso sem resposta
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  searchCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
